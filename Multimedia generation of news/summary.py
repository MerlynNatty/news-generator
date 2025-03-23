import streamlit as st
import requests
import os
import cv2
import numpy as np
import tempfile
import subprocess
from newspaper import Article
from transformers import pipeline
from gtts import gTTS  # Text-to-Speech

# 🔑 API Keys (Replace with your actual keys)
NEWS_API_KEY = "6ee544c9b4d643af819d1aecf86e7afe"
UNSPLASH_ACCESS_KEY = "FvOtYsg8lTKDL3F_T7LetxS2wyyBLkEGvJuP7u7lFOc"

# 🎯 Streamlit UI
st.set_page_config(page_title="AI-Powered News", layout="wide")
st.title("📰 AI-Powered Personalized News")

# 🔥 Fetch News from NewsAPI
def fetch_news(topic):
    url = f"https://newsapi.org/v2/everything?q={topic}&apiKey={NEWS_API_KEY}&pageSize=3"
    response = requests.get(url)
    if response.status_code == 200:
        return response.json().get("articles", [])
    return []

# 🔎 Fetch images using Unsplash API
def fetch_images_unsplash(query, num_images=6):
    url = f"https://api.unsplash.com/search/photos?query={query}&per_page={num_images}&client_id={UNSPLASH_ACCESS_KEY}"
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return [img["urls"]["regular"] for img in data.get("results", [])]
    return []

# 🟢 News Selection
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

# 📰 Display News
if "news_articles" in st.session_state and st.session_state.news_articles:
    for i, news in enumerate(st.session_state.news_articles):
        if st.button(f"📰 {news['title']}", key=f"news_{i}"):
            st.session_state.selected_article = news["url"]
            st.rerun()

# 🎥 Generate AI News Video
if "selected_article" in st.session_state and st.session_state.selected_article:
    st.subheader("🎥 AI-Generated Video News")
    
    article_url = st.session_state.selected_article
    article = Article(article_url)
    article.download()
    article.parse()
    
    # 🔥 Summarize the article
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarizer(article.text[:1024], max_length=100, min_length=30, do_sample=False)[0]['summary_text']
    st.write(f"**Summary:** {summary}")

    # 🔊 Convert summary to speech
    tts = gTTS(summary)
    audio_path = "summary_audio.mp3"
    tts.save(audio_path)

    # 📸 Fetch related images from Unsplash
    query = " ".join(summary.split()[:5])  # Use first 5 words as search query
    image_urls = fetch_images_unsplash(query)

    image_paths = []
    for i, img_url in enumerate(image_urls):
        img_data = requests.get(img_url).content
        img_path = f"image_{i}.jpg"
        with open(img_path, "wb") as f:
            f.write(img_data)
        image_paths.append(img_path)

    # 🎬 Generate Video using OpenCV
    frame_size = (1280, 720)
    fps = 1  
    duration_per_image = 10  # 10 seconds per image
    total_duration = 60  # 1-minute video

    video_path = "news_video.avi"
    fourcc = cv2.VideoWriter_fourcc(*"XVID")
    video_writer = cv2.VideoWriter(video_path, fourcc, fps, frame_size)

    for _ in range(total_duration // duration_per_image):
        for img_path in image_paths:
            img = cv2.imread(img_path)
            img = cv2.resize(img, frame_size)
            for _ in range(duration_per_image * fps):  
                video_writer.write(img)

    video_writer.release()

    # 🎼 Merge Audio & Video with FFmpeg
    final_video_path = "news_video_final.mp4"
    ffmpeg_cmd = [
        "ffmpeg",
        "-i", video_path,  # Input video file
        "-i", audio_path,  # Input audio file
        "-c:v", "libx264",  # Video codec
        "-c:a", "aac",  # Audio codec
        "-strict", "experimental",
        "-shortest",  # Trim to shortest length (audio/video sync)
        final_video_path
    ]

    subprocess.run(ffmpeg_cmd, check=True)

    # 🎥 Display Video
    st.video(final_video_path)

    # Cleanup
    if st.button("🔄 Back to News"):
        st.session_state.selected_article = None
        for img_path in image_paths:
            os.remove(img_path)
        os.remove(audio_path)
        os.remove(video_path)
        os.remove(final_video_path)
        st.rerun()
