export const metadata = {
  title: "GitHub Friends",
  description: "A Visualization of a Github users network",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
