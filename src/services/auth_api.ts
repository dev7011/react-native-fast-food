const API_URL = "http://localhost:3000/api/v1"

export async function loginApi(
  email: string,
  password: string
) {

  const response = await fetch(
    `${API_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: {email, password } }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Login failed (${response.status}): ${response}`
    );
  }

  return response.json();
}

export async function getCurrentUser(accessToken: string) {
  const response = await fetch(
    `${API_URL}/user`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Session is invalid or expired");
  }

  return response.json();
}