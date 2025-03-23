import json
from transformers import pipeline
import fetch_news  # Import news fetching function

# Load the Hugging Face summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_text(text):
    """Summarizes the given text using Hugging Face's BART model."""
    summary = summarizer(text, max_length=24, min_length=9, do_sample=False)
    return summary[0]['summary_text']

if __name__ == "__main__":
    news_articles = fetch_news.fetch_news()

    if not news_articles:
        print("❌ No news articles found.")
    else:
        summaries = []  # List to store summaries
        for i, article in enumerate(news_articles[:3]):  # Summarize first 3 articles
            summary_text = summarize_text(article)
            summaries.append({"id": i+1, "summary": summary_text})
            print(f"\n🔹 News {i+1}:")
            print(f"Summary: {summary_text}")

        # Save summaries to a JSON file
        with open("summarized_news.json", "w", encoding="utf-8") as f:
            json.dump(summaries, f, indent=4, ensure_ascii=False)
        print("✅ Summaries saved to summarized_news.json")


"""
from transformers import pipeline
import fetch_news  # Import news fetching function
import json

# Load the Hugging Face summarization pipeline
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def summarize_text(text):
  Summarizes the given text using Hugging Face's BART model.
    summary = summarizer(text, max_length=24, min_length=9, do_sample=False)
    return summary[0]['summary_text']

if __name__ == "__main__":
    news_articles = fetch_news.fetch_news()

    if not news_articles:
        print("❌ No news articles found.")
    else:
        for i, article in enumerate(news_articles[:3]):  # Summarize first 3 articles
            print(f"\n🔹 News {i+1}:")
            print(f"Original: {article[:300]}...")  # Print first 300 chars
            print(f"Summary: {summarize_text(article)}")
        with open("summarized_news.json", "w", encoding="utf-8") as f:
            json.dump(summary, f, indent=4, ensure_ascii=False)
        print("✅ Summaries saved to summarized_news.json")

"""