import json
from deep_translator import GoogleTranslator
from gtts import gTTS

def translate_text(text, lang):
    """Translates text to the specified language using GoogleTranslator."""
    return GoogleTranslator(source='auto', target=lang).translate(text)

if __name__ == "__main__":
    try:
        # Load summarized news from file
        with open("summarized_news.json", "r", encoding="utf-8") as f:
            summaries = json.load(f)

        if not summaries:
            print("❌ No summaries available for translation.")
        else:
            target_lang = input("Enter target language (e.g., 'es' for Spanish, 'fr' for French): ").strip()
            for item in summaries:
                translated_text = translate_text(item["summary"], target_lang)
                print(f"\n🔹 Translated Summary {item['id']}: {translated_text}")

                # Generate translated audio
                tts = gTTS(text=translated_text, lang=target_lang)
                audio_filename = f"translated_news_{item['id']}.mp3"
                tts.save(audio_filename)
                print(f"✅ Translated audio saved as {audio_filename}")

    except FileNotFoundError:
        print("❌ Error: Summarized news file not found!")