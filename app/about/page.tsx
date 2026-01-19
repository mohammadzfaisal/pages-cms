import { Info } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-[#D4F582]/10 border-2 border-[#D4F582] flex items-center justify-center">
              <Info className="w-6 h-6 text-[#D4F582]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading text-white">
              About Frontmatter
            </h1>
          </div>

          <div className="space-y-6 text-white">
            <p className="text-lg md:text-xl leading-relaxed">
              Tired of broken YAML and Git conflicts? Most static site generators promise simplicity, but they often leave you trapped in a cycle of manual updates and syntax errors.
            </p>
            <p className="text-lg md:text-xl leading-relaxed">
              Frontmatter is built to bridge that gap, providing a user-friendly CMS experience running straight on top of GitHub. We believe content management should be simple, structured, and seamless.
            </p>

            <div className="grid md:grid-cols-2 gap-8 pt-6">
              <div>
                <h2 className="text-xl font-bold font-heading mb-3 text-gray-300">Our Mission</h2>
                <p className="leading-relaxed">
                  To eliminate the friction between developers and content creators by providing a structured, visual interface for Git-based content management.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-bold font-heading mb-3 text-gray-300">Who We Serve</h2>
                <p className="leading-relaxed">
                  Developers who need content management without the overhead, teams who value Git workflows, and anyone tired of fighting with YAML syntax errors.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-border">
              <h2 className="text-2xl font-bold font-heading mb-4 text-gray-300">Our Story</h2>
              <p className="leading-relaxed mb-4">
                Frontmatter was born from frustration. As developers, we loved the simplicity of static site generators and the power of Git-based workflows. But managing content through raw markdown files and YAML frontmatter became a bottleneck for teams.
              </p>
              <p className="leading-relaxed mb-4">
                Content creators struggled with syntax errors. Developers spent time fixing broken YAML. Collaboration meant resolving Git conflicts in ways that felt archaic compared to modern CMSs.
              </p>
              <p className="leading-relaxed">
                We built Frontmatter to solve this. A visual CMS that works directly with your Git repository, providing structure and validation without sacrificing the developer experience you love.
              </p>
            </div>

            <div className="pt-8 border-t border-border">
              <h2 className="text-2xl font-bold font-heading mb-4 text-gray-300">Core Values</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-300">Developer First</h3>
                  <p className="leading-relaxed">
                    We're developers too. Every decision prioritizes developer experience and workflow efficiency.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-300">Open and Transparent</h3>
                  <p className="leading-relaxed">
                    Open source at our core. Your content stays in your Git repository, under your control.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-gray-300">Simple by Design</h3>
                  <p className="leading-relaxed">
                    Complexity is easy. Simplicity is hard. We choose hard to make your life easier.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 text-center">
              <Link
                href="/"
                className="text-[#D4F582] hover:underline font-medium text-lg"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}