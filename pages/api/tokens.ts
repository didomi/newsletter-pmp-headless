import type { NextApiRequest, NextApiResponse } from "next";

// DIDOMI PRE RELEASE PROD
const DIDOMI_API_KEY = process.env.DIDOMI_API_KEY;
const DIDOMI_API_SECRET = process.env.DIDOMI_API_SECRET;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;

/**
 * Retrieves the access token from the Didomi API.
 * @returns {Promise<string>} The access token.
 */
const getAccessToken = async () => {
  const response = await fetch('https://api.didomi.io/v1/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: "api-key",
      key: DIDOMI_API_KEY,
      secret: DIDOMI_API_SECRET
    }),
  });

  const data = await response.json();
  return data.access_token;
}

/**
 * Generate the client token for a given access token and email.
 * @param accessToken The access token.
 * @param email The email address.
 * @returns The client token.
 */
const getClientToken = async ({ accessToken, email }: { accessToken: string, email: string }) => {
  const response = await fetch(`https://api.didomi.io/consents/tokens?organization_id=${ORGANIZATION_ID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      organization_id: ORGANIZATION_ID,
      organization_user_id: email,
      permissions: ['write'],
      validations: {
        email: {
            enabled: true,
            approval: true
        }
    }
    }),
  });

  const data = await response.json();
  return data.id_token;

}

/**
 * Handles the API request for generating tokens.
 * 
 * @param req - The NextApiRequest object representing the incoming request.
 * @param res - The NextApiResponse object representing the outgoing response.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { email } = req.body;

  if (req.method === 'POST') {
    const accessToken = await getAccessToken();
    const clientToken = await getClientToken({ accessToken, email });

    res.status(200).json({ token: clientToken });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}