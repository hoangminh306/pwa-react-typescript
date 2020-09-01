import React, { useEffect, useState } from 'react';
var url = 'http://newsapi.org/v2/top-headlines?' +
	'country=us&' +
	'apiKey=0ea74e3c9ae2451a8bffed9a6e919b6d';

const Home = () => {
	const [news, setNews] = useState([]);
	useEffect(() => {
		updateNews();
	}, []);

	const updateNews = async () => {
		const res = await fetch(url);
		const json = await res.json();
		const news = json.articles.map(createArticle);
		setNews(news);
	}

	const createArticle = (article: { url: string | undefined; title: React.ReactNode; urlToImage: string | undefined; description: React.ReactNode; }) => {
		return (
			<>
				<div className="article">
					<a href={article.url}>
						<h2>{article.title}</h2>
						<img src={article.urlToImage} style={{ width: 300, height: 300 }} />
						<p>{article.description}</p>
					</a>
				</div>
				<br />
				<hr />
				<br />
			</>
		)
	}
	return (
		<div className="w-100">{news.length > 0 ? news.map(item => item) : 'Không có dữ liệu'}</div>
	)
};

export default Home;
