export default async function ProfilePage() {
  const response = await fetch("https://fakestoreapi.com/users/3");
  const user = await response.json();

  return (
    <main>
      <h1>Profile</h1>
      <p>
        Name: {user.name.firstname} {user.name.lastname}
      </p>
      <p>Username: {user.username}</p>
      <p>Email: {user.email}</p>
    </main>
  );
}
