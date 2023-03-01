import "~/styles/globals.css";

export const metadata = {
  title: "Sanity Blog",
  description: "A blog using Sanity CMS",
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
