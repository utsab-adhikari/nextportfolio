import { signIn } from "next-auth/react";

const demoImagesTop = [
  "https://imgs.search.brave.com/NaQtFY1TB6XRPfM5qxZTpGWA-zllmg8CT_qsYnvYIv4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNDc0/OTAyNDMyL3ZlY3Rv/ci9oYXBweS15b3Vu/Zy1mYW1pbHktd2Fs/a2luZy1hdC1zdW5z/ZXQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPVBEOVVzLUpH/ekREek14b1VmRmp1/cTUwcTEyc25Rdnlx/bUJtdWJJNmRfWW89",
  "https://imgs.search.brave.com/irixyV30bZ1bAtKegdN1Czia754i6ZTKCcxGxjav7wo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9mYW1p/bHktcnVyYWwtZmFy/bS1uZXBhbGVzZS1t/b3VudGFpbnMtYW5u/YXB1cm5hLWNpcmN1/aXQtMTg5NjQ5MjU0/LmpwZw",
  "https://imgs.search.brave.com/emXlRB5CISNOfllITH4_UBIvjcCOX42Shdr6MvIsNIc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dG91cnJhZGFyLmNv/bS9zMy90b3VyLzM2/MHgyMTAvMTM4MTY0/XzY1MzJjOWFiMzBi/MzIuanBn",
];
const demoImagesBottom = [
  "https://imgs.search.brave.com/CzM2zQAvdzQM3Xckoe3NfLSU1U6MKGGa7U4X8bvftfo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcGljanVt/Ym8uY29tL3dwLWNv/bnRlbnQvdXBsb2Fk/cy90ZXh0LW5hdHVy/ZS1tZXRhbC1sZXR0/ZXJzLW9uLWEtcm9j/ay1pbi1ncmVlbi1m/b3Jlc3QtZnJlZS1w/aG90by5qcGc_dz02/MDAmcXVhbGl0eT04/MA",
  "https://imgs.search.brave.com/Arm7MF6-E-jbQAgOgVFI6CM7bfyEwdlYMCEUAJFQZtk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9ucGxp/bWFnZXMuaW5mcmFk/b3h4cy5jb20vY2Fj/aGUvbWNhY2hlMi8w/MTI2MTEwOS5qcGc",
  "https://imgs.search.brave.com/en8yFStbOzCPcD-n49bUqGV48J5kr8_uyyTvj-dc1XM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNjM1/OTk5MTgwL3Bob3Rv/L25lcGFsaS13b21h/bi1wb2ludGluZy1h/dC1tYWNoYXB1Y2hh/cmUtcG9raGFyYS1u/ZXBhbC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9NFc3Ykpa/X2pwSjRHNFhmeFUt/TnAwY3JvRVRGbXlR/ZHJsUVlGU0p5bU9Z/OD0",
];

export default function Unauthenticated() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-between text-white px-2 py-6">
      {/* Top Section: Images + Title */}
      <section className="w-full flex flex-col items-center mb-8">
        <div className="flex gap-4 mb-6">
          {demoImagesTop.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Family memory ${idx + 1}`}
              className="w-28 h-28 object-cover rounded-xl shadow-lg bg-gray-800 border border-gray-700"
              loading="lazy"
            />
          ))}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center drop-shadow-lg">
          Family Gallery Login
        </h1>
        <p className="text-lg text-gray-300 text-center max-w-xl mb-4">
          Access your private family cloud galleries.
          <br />
          Only approved family members can view, upload, and organize albums &
          memories.
        </p>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="px-7 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg shadow-md transition"
        >
          Login to Continue
        </button>
        <div className="mt-3 text-sm text-gray-400">
          <span>Login with your family email. Not a member?</span>
          <span className="ml-2 font-semibold text-blue-400">
            Request Access
          </span>
        </div>
      </section>

      {/* Bottom Section: Demo, Feature Explanation, More Images */}
      <section className="w-full max-w-2xl flex flex-col items-center gap-4">
        <div className="flex gap-3 mb-4">
          {demoImagesBottom.map((src, idx) => (
            <img
              key={src}
              src={src}
              alt={`Gallery demo ${idx + 1}`}
              className="w-24 h-24 object-cover rounded-xl bg-gray-800 border border-gray-700"
              loading="lazy"
            />
          ))}
        </div>
        <div className="bg-gray-900/70 rounded-xl p-5 shadow-lg mb-4 w-full text-center">
          <h2 className="text-2xl font-bold mb-2">Project Demo & Features</h2>
          <p className="text-gray-300 mb-3 text-base">
            This is a secure family image gallery built with <b>Next.js</b>,{" "}
            <b>MongoDB</b>, and <b>Cloudinary</b>. Approved users can:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-left mx-auto max-w-lg mb-2">
            <li>View and relive precious family moments</li>
            <li>Create and organize custom albums</li>
            <li>Upload and manage images with ease</li>
            <li>Enjoy private, cloud-backed storage</li>
          </ul>
          <div className="my-3">
            <span className="bg-blue-800/80 px-3 py-1 rounded-md text-base font-medium text-blue-200">
              Demo Access:{" "}
              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="underline hover:text-blue-400 ml-1"
              >
                Login as Demo User
              </button>
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            For demonstration, you can log in as a demo user and explore album
            creation, image uploads, and more!
          </p>
        </div>
        <div className="text-center text-xs text-gray-500 mt-2 mb-1">
           Family Gallery • Made with Next.js,
          MongoDB & Cloudinary
        </div>
      </section>
    </main>
  );
}
