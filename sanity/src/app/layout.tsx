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
      <body>
        <div className="min-h-screen bg-white dark:bg-gray-900">{children}</div>
      </body>
    </html>
  );
}
