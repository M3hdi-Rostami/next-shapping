import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import User from "@/database/models/user";
import bcrypt from "bcryptjs";
import db from "@/database/db";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && user._id) {
        token._id = user._id.toString();
        token.isAdmin = user.isAdmin || false;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) session.user = {};
      if (token._id) session.user._id = token._id;
      if (token.isAdmin) session.user.isAdmin = token.isAdmin;

      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await User.findOne({ email: credentials.email }).lean();

        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          const { _id, name, email, isAdmin, ...otherData } = user;
          return {
            _id,
            name,
            email,
            isAdmin,
            image: null,
          };
        }
        throw new Error("Invalid email or password");
      },
    }),
  ],
};

export default NextAuth(authOptions);
