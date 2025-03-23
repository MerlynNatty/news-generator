import streamlit as st
import requests
from newspaper import Article
from transformers import pipeline
from gtts import gTTS
from deep_translator import GoogleTranslator
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import tempfile
import moviepy.editor as mp
import numpy as np

# Set Streamlit Page Configuration
st.set_page_config(page_title="AI-Powered News", layout="wide")

# API Keys
NEWS_API_KEY = "6dad3445ed2243da8e85859a7d2ed2c2"

# Load Models
@st.cache_resource
def load_summarizer():
    return pipeline("summarization", model="facebook/bart-large-cnn")

summarizer = load_summarizer()

# Streamlit UI for Summarization and Audio Generation
st.title("📰 AI-Powered Personalized News")

# Fetch News
def fetch_news(topic):
    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={NEWS_API_KEY}&pageSize=3"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get("articles", [])
    return []

selected_topics = st.multiselect("Choose Topics:", ["Sports", "Technology", "Health", "Business"], default=[])

if st.button("🚀 Fetch News"):
    if not selected_topics:
        st.warning("⚠️ Select at least one category!")
    else:
        news_list = []
        for category in selected_topics:
            news_list.extend(fetch_news(category))
        if not news_list:
            st.error("❌ No news found.")
        else:
            st.session_state.news_articles = news_list
            st.success("✅ News Fetched Successfully!")

# Display News and Summarization
if "news_articles" in st.session_state and st.session_state.news_articles:
    for i, news in enumerate(st.session_state.news_articles):
        st.image(news["urlToImage"], width=400)
        st.write(f"**{news['title']}**")
        st.write(news["description"])
        if st.button(f"Read More", key=f"readmore_{i}"):
            st.markdown(f"[Click here to read full article]({news['url']})")

        # Summarization
        if st.button(f"Summarize", key=f"summarize_{i}"):
            article = Article(news['url'])
            article.download()
            article.parse()
            summary = summarizer(article.text[:1024], max_length=100, min_length=30, do_sample=False)[0]['summary_text']
            st.write(f"**Summary:** {summary}")

            # Translation
            lang = st.selectbox("Translate To:", ["French", "Spanish", "German", "Hindi", "Chinese"], key=f"lang_{i}")
            if st.button(f"Translate", key=f"translate_{i}"):
                translated_summary = GoogleTranslator(source='auto', target=lang.lower()).translate(summary)
                st.write(f"**Translated Summary ({lang}):** {translated_summary}")

# -------------------------------------------

# AR News Fetching and Celebrity Identification

# Load CLIP Model for celebrity identification
@st.cache_resource
def load_clip_model():
    return CLIPModel.from_pretrained("openai/clip-vit-base-patch32"), CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

clip_model, clip_processor = load_clip_model()

st.header("📷 AI News Fetcher")
uploaded_file = st.file_uploader("Upload an image of a celebrity", type=["jpg", "png", "jpeg"])

def identify_person(image):
    try:
        # List of known celebrities
        text = ["Narendra Modi", "Elon Musk", "Cristiano Ronaldo", "Taylor Swift"]
        # Process image and text
        image_tensor = clip_processor(images=image, return_tensors="pt").pixel_values
        text_input = clip_processor(text=text, images=image_tensor, return_tensors="pt", padding=True)
        with torch.no_grad():
            outputs = clip_model(**text_input)
        best_match_idx = outputs.logits_per_image.softmax(dim=1).argmax().item()
        return text[best_match_idx]
    except Exception as e:
        return "Unknown"

def get_news(person_name):
    url = f"https://newsapi.org/v2/everything?q={person_name}&sortBy=publishedAt&apiKey={NEWS_API_KEY}"
    response = requests.get(url).json()
    return [(a["title"], a["url"]) for a in response.get("articles", [])[:5]]

if uploaded_file:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image", use_container_width=True)
    with st.spinner("Identifying person..."):
        person_name = identify_person(image)
    st.success(f"Identified: {person_name}")
    with st.spinner("Fetching news..."):
        news = get_news(person_name)
    st.write("### Latest News")
    for title, url in news:
        st.markdown(f"- [{title}]({url})")

# -------------------------------------------

# Video Generation
st.header("🎬 Video Generation from News")

def generate_video_from_text(news_titles):
    clips = []
    for title in news_titles:
        # Create text clip with each news title
        txt_clip = mp.TextClip(title, fontsize=50, color='white', size=(640, 480), method='caption')
        txt_clip = txt_clip.set_duration(3)  # Each title stays for 3 seconds
        clips.append(txt_clip)

    # Concatenate all clips
    video = mp.concatenate_videoclips(clips, method="compose")
    
    # Write the video to a temporary file
    temp_video = tempfile.NamedTemporaryFile(delete=False, suffix=".mp4")
    video.write_videofile(temp_video.name, codec="libx264", fps=24)
    
    return temp_video.name

if st.button("Generate Video from News Headlines"):
    if "news_articles" in st.session_state and st.session_state.news_articles:
        news_titles = [news["title"] for news in st.session_state.news_articles]
        video_path = generate_video_from_text(news_titles)
        st.video(video_path)

# -------------------------------------------

# Audio Generation
st.header("🔊 Audio Generation from News Headlines")

def generate_audio_from_text(news_titles):
    text = " ".join(news_titles)
    tts = gTTS(text)
    temp_audio = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
    tts.save(temp_audio.name)
    return temp_audio.name

if st.button("Generate Audio from News Headlines"):
    if "news_articles" in st.session_state and st.session_state.news_articles:
        news_titles = [news["title"] for news in st.session_state.news_articles]
        audio_path = generate_audio_from_text(news_titles)
        st.audio(audio_path)
