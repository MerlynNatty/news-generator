import requests
import os
from dotenv import load_dotenv

# Load API keys from .env file
load_dotenv()
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

def fetch_news():
    """Fetches news articles using NewsAPI."""
    url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={NEWS_API_KEY}"
    
    response = requests.get(url)
    data = response.json()
    
    if data.get("status") != "ok":
        print("❌ Error fetching news:", data)
        return []
    
    articles = data.get("articles", [])
    return [article["content"] for article in articles if article["content"]]

if __name__ == "__main__":
    news = fetch_news()
    print(news[:3])  # Print first 3 news articles


"""import requests
from config import NEWS_API_KEY

def get_news(query="technology", num_articles=5):
    Fetch top news articles based on a keyword.
    url = f"https://newsapi.org/v2/everything?q={query}&apiKey={NEWS_API_KEY}"
    
    response = requests.get(url)
    if response.status_code != 200:
        print("Error fetching news:", response.json())
        return []

    data = response.json()
    articles = data.get("articles", [])[:num_articles]

    return [
        {"title": article["title"], "content": article["description"], "url": article["url"]}
        for article in articles
    ]

if __name__ == "__main__":
    news = get_news("AI")  # Test fetching AI-related news
    for idx, article in enumerate(news, 1):
        print(f"{idx}. {article['title']}\n{article['url']}\n")
"""