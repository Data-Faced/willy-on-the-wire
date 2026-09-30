export default function InstagramFeed({ reels }) {
  return (
    <div className="ig-row">
      {reels.slice(0, 3).map((reel) => (
        <div className="ig-card" key={reel.id}>
          <iframe
            src={`https://www.instagram.com/${reel.path}/${reel.id}/embed`}
            title={reel.label}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      ))}
    </div>
  );
}
