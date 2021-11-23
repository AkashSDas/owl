export const EmojiSection = () => {
  return (
    <div style={{ zIndex: -1 }} className="absolute w-full">
      <span className="text-desktop-h4 absolute top-10 left-32">🎸</span>
      <span className="text-desktop-h4 absolute top-48 left-48">🔬</span>
      <span className="text-desktop-h4 absolute top-96 left-40">📖</span>
      <span className="text-desktop-h4 absolute top-10 right-32">🔭</span>
      <span className="text-desktop-h4 absolute top-48 right-48">👓</span>
      <span className="text-desktop-h4 absolute top-96 right-40">🎥</span>
    </div>
  );
};

export const EmojiSectionForSidebar = () => {
  return (
    <div style={{ zIndex: -1 }} className="absolute w-full">
      <span className="text-desktop-h4 absolute top-10 left-8">🎸</span>
      <span className="text-desktop-h4 absolute top-48 left-5">🔬</span>
      <span className="text-desktop-h4 absolute top-96 left-9">📖</span>
      <span className="text-desktop-h4 absolute top-10 right-8">🔭</span>
      <span className="text-desktop-h4 absolute top-48 right-5">👓</span>
      <span className="text-desktop-h4 absolute top-96 right-9">🎥</span>
    </div>
  );
};
