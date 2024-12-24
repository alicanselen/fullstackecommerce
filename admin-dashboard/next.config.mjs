'use client'
import { withGluestackUI } from "@gluestack/ui-next-adapter";
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["nativewind", "react-native-css-interop"],
  swcMinify:true,
};

export default withGluestackUI(nextConfig);
