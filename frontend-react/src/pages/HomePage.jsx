import WelcomeMenu from '../components/WelcomeMenu';

export default function HomePage() {
  const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <WelcomeMenu user={user} />
    </main>
  );
}