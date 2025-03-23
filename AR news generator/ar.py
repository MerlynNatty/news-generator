import streamlit as st
import torch
from PIL import Image
from transformers import CLIPProcessor, CLIPModel
import requests

# Load CLIP model
model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Function to identify person
def identify_person(image):
    text = ["Narendra Modi", "Elon Musk", "Cristiano Ronaldo", "Taylor Swift"]
    inputs = processor(text=text, images=image, return_tensors="pt", padding=True)
    outputs = model(**inputs)
    best_match_idx = outputs.logits_per_image.softmax(dim=1).argmax().item()
    return text[best_match_idx]

# Function to fetch news articles
def get_news(person_name):
    api_key = "6ee544c9b4d643af819d1aecf86e7afe"  
    url = f"https://newsapi.org/v2/everything?q={person_name}&sortBy=publishedAt&apiKey={api_key}"
    response = requests.get(url).json()
    articles = response.get("articles", [])[:5]  # Get top 5 articles
    return [(a["title"], a["url"]) for a in articles]

# Streamlit UI
st.title("📰 AI News Fetcher")
uploaded_file = st.file_uploader("Upload an image...", type=["jpg", "png", "jpeg"])

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

