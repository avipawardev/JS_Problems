import React, { useState, useMemo } from "react";

// Post component wrapped with React.memo to prevent unnecessary re-renders
const Post = React.memo(function Post({ id, title, body }) {
  const [verified, setVerified] = useState(false);

  // Generate random background color only once per Post
  const bgColor = useMemo(() => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b}, 0.2)`;
  }, []);

  return (
    <div className="post" style={{ backgroundColor: bgColor }}>
      <h3>
        {id}. {title}
      </h3>
      <p>{body}</p>
      <p>Status: {verified ? "✅ Verified" : "❌ Not Verified"}</p>
      <button onClick={() => setVerified((prev) => !prev)}>
        {verified ? "Unverify" : "Verify"}
      </button>
    </div>
  );
});

export default Post;
