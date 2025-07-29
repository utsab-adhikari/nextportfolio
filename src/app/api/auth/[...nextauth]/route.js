import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/db/ConnectDB";
import User from "@/app/models/User.model";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    async session({ session }) {
      await connectDB();
      if (session?.user?.email) {
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
          session.user.name = user.name;
          session.user.role = user.role;
          session.user.badge = user.badge;
        }
      }
      return session;
    },

    async signIn({ user }) {
      await connectDB();
      let existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
          provider: "google",
          role: "user",
        });
      }
      return true;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ App Router export (NextAuth v5 syntax)
const { handlers } = NextAuth(authOptions);
export const GET = handlers.GET;
export const POST = handlers.POST;
