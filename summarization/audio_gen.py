from gtts import gTTS
import os
import fetch_news  # Import your existing news fetching module

def text_to_speech(text, filename="news_audio.mp3"):
    tts = gTTS(text=text, lang="en")
    tts.save(filename)
    print(f"✅ Audio saved as {filename}")

if __name__ == "__main__":
    news_summaries = fetch_news.fetch_news()  # Call the existing function
    for i, summary in enumerate(news_summaries[:3]):
        audio_filename = f"news_{i+1}.mp3"
        text_to_speech(summary, audio_filename)