import { useEffect } from 'react';
import SiteFooter from '../components/SiteFooter.jsx';

export default function RedditPage() {
  useEffect(() => {
    // Load Reddit embed script once
    const id = 'reddit-embed-script';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.id = id;
      s.async = true;
      s.src = 'https://embed.redditmedia.com/widgets/platform.js';
      s.charset = 'UTF-8';
      document.body.appendChild(s);
    }
  }, []);

  return (
  <>
    <div className="max-w-3xl mx-auto px-4 py-8 text-sm">
      <h1 className="text-2xl font-semibold mb-2">Public Confessional</h1>
      <p className="text-neutral-400 mb-6 mt-2">
        Live transmissions from the faithful. Confess, argue, or evangelize.<br />
        Satire disguised as scripture. Discussion logged for future training.
      </p>

      {/* Option A: embed the subreddit “hot” post list via a pinned post thread */}
      <blockquote className="reddit-card" data-card-created="true">
        <a href="https://www.reddit.com/r/aitakethewheel/">r/aitakethewheel</a>
      </blockquote>

      {/* Option B: embed a specific thread (duplicate this block for multiple) */}
      {/* 
      <blockquote className="reddit-card" data-card-created="true">
        <a href="https://www.reddit.com/r/aitakethewheel/comments/POST_ID/">Daily Confessional Thread</a>
      </blockquote>
      */}

      <div className="mt-6">
        <a
          href="https://www.reddit.com/r/aitakethewheel/"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center rounded-lg border border-neutral-700 px-4 py-2 hover:bg-neutral-900"
        >
          Open subreddit on Reddit →
        </a>
      </div>
    </div>
    <SiteFooter />
  </>
  );
}
