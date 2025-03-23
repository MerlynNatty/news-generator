import streamlit as st
from transformers import pipeline

# Load a pre-trained fake news detection model
@st.cache_resource
def load_model():
    return pipeline("text-classification", model="roberta-base-openai-detector")

model = load_model()

# Streamlit UI
st.title("Fake News Detection")
st.write("Enter a news statement to check if it's real or fake.")

news_text = st.text_area("Enter News Text:")

if st.button("Check News Authenticity"):
    if news_text.strip():
        result = model(news_text)[0]
        label = result['label']
        score = result['score']
        
        st.write(f"Prediction: **{label}**")
        st.write(f"Confidence Score: {score:.2f}")
    else:
        st.warning("Please enter some news text to check.")

# Run with: streamlit run script_name.py
