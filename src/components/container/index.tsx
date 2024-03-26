const ContentContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="w-full bg-white p-4">{children}</div>;
};

export default ContentContainer;
