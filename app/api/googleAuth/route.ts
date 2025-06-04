import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

        if (!baseUrl) {
            return NextResponse.json(
                { error: "API URL is not set in environment variables." },
                { status: 500 }
            );
        }

        // Corrected backend endpoint
        const backendUrl = `${baseUrl}/api/auth/google/url`;
        const { data } = await axios.get(backendUrl);

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        console.log("error in Axios GET request:", error.message);
        const status = error.response?.status || 500;
        return NextResponse.json(
            { error: "error fetching Google Auth URL" },
            { status }
        );
    }
}


