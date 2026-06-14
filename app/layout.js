import './globals.css';
import Navbar from './components/Navbar';

export const metadata = {
  title: 'Simple Diagram Builder',
  description: 'Visualize ideas, processes, or plans with a simple, accessible diagram tool.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
