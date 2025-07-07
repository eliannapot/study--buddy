
const config = {
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const verifyPasswordWithoutAffectingSession = async (email, password) => {
    try {
        const response = await fetch(`${config.endpoint}/account/sessions/email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Appwrite-Project': config.projectId,
            },
            body: JSON.stringify({ email, password }),
            credentials: 'omit',
        });

        const data = await response.json();

        if (response.status === 401) {
            return { success: false }; // wrong password
        }

        if (!response.ok) {
            return { error: data?.message || "Unknown error" };
        }

        const sessionId = data?.$id;
        const sessionSecret = data?.secret;

        if (sessionId && sessionSecret) {
            await fetch(`${config.endpoint}/account/sessions/${sessionId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': config.projectId,
                    'X-Appwrite-Session': sessionSecret,
                },
                credentials: 'omit', // again, avoid affecting main session
            });
        }

        return { success: true };
    } catch (err) {
        console.error("verifyPassword error:", err);
        return { error: err.message || "Unknown error" };
    }
};
