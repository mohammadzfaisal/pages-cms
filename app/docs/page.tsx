import { Book, Rocket, Settings, Code, FileText } from "lucide-react";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-lg bg-[#D4F582]/10 border-2 border-[#D4F582] flex items-center justify-center">
              <Book className="w-6 h-6 text-[#D4F582]" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold font-heading text-white">
              Documentation
            </h1>
          </div>

          <p className="text-lg text-white mb-12">
            Everything you need to get started with Frontmatter and master Git-based content management.
          </p>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Getting Started */}
            <div className="bg-card/30 border border-border rounded-lg p-6 hover:border-[#D4F582] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Rocket className="w-6 h-6 text-[#D4F582]" />
                <h2 className="text-xl font-bold font-heading text-white">Getting Started</h2>
              </div>
              <p className="text-white mb-4">
                Quick start guide to set up Frontmatter with your GitHub repository in minutes.
              </p>
              <Link href="#getting-started" className="text-[#D4F582] hover:underline font-medium">
                Read the guide →
              </Link>
            </div>

            {/* Configuration */}
            <div className="bg-card/30 border border-border rounded-lg p-6 hover:border-[#D4F582] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="w-6 h-6 text-[#D4F582]" />
                <h2 className="text-xl font-bold font-heading text-white">Configuration</h2>
              </div>
              <p className="text-white mb-4">
                Learn how to customize schemas, validation rules, and UI components.
              </p>
              <Link href="#configuration" className="text-[#D4F582] hover:underline font-medium">
                View configuration →
              </Link>
            </div>

            {/* API Reference */}
            <div className="bg-card/30 border border-border rounded-lg p-6 hover:border-[#D4F582] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <Code className="w-6 h-6 text-[#D4F582]" />
                <h2 className="text-xl font-bold font-heading text-white">API Reference</h2>
              </div>
              <p className="text-white mb-4">
                Complete API documentation for integrating Frontmatter into your workflow.
              </p>
              <Link href="#api-reference" className="text-[#D4F582] hover:underline font-medium">
                Explore API →
              </Link>
            </div>

            {/* Examples */}
            <div className="bg-card/30 border border-border rounded-lg p-6 hover:border-[#D4F582] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="w-6 h-6 text-[#D4F582]" />
                <h2 className="text-xl font-bold font-heading text-white">Examples</h2>
              </div>
              <p className="text-white mb-4">
                Real-world examples and starter templates to jumpstart your project.
              </p>
              <Link href="#examples" className="text-[#D4F582] hover:underline font-medium">
                Browse examples →
              </Link>
            </div>
          </div>

          {/* Getting Started Section */}
          <div id="getting-started" className="pt-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-300 mb-6">
              Getting Started
            </h2>
            <div className="space-y-6 text-white">
              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-300">1. Install Frontmatter</h3>
                <div className="bg-card/50 border border-border rounded-lg p-4 font-mono text-sm">
                  npm install frontmatter-cms
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-300">2. Connect Your Repository</h3>
                <p className="leading-relaxed mb-3">
                  Sign in with GitHub and authorize Frontmatter to access your repositories. We only request the minimum permissions needed.
                </p>
                <div className="bg-card/50 border border-border rounded-lg p-4 font-mono text-sm">
                  frontmatter init --repo=your-username/your-repo
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-300">3. Define Your Schema</h3>
                <p className="leading-relaxed mb-3">
                  Create a schema file to define your content structure. This ensures data consistency and prevents errors.
                </p>
                <div className="bg-card/50 border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
                  {`// frontmatter.config.js
export default {
  schemas: {
    post: {
      title: { type: 'string', required: true },
      date: { type: 'date', required: true },
      tags: { type: 'array', items: 'string' }
    }
  }
}`}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-300">4. Start Managing Content</h3>
                <p className="leading-relaxed mb-4">
                  Launch the Frontmatter UI and start creating, editing, and managing your content through an intuitive interface.
                </p>
                <div className="bg-card/50 border border-border rounded-lg p-4 font-mono text-sm mb-6">
                  frontmatter start
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Section */}
          <div id="configuration" className="pt-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-gray-300 mb-6">
              Configuration
            </h2>
            <div className="space-y-6 text-white">
              <p className="leading-relaxed">
                Frontmatter is highly configurable. Customize everything from content schemas to UI components.
              </p>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-300">Schema Types</h3>
                <ul className="list-disc list-inside space-y-2 leading-relaxed">
                  <li><strong>string</strong> - Text content</li>
                  <li><strong>number</strong> - Numeric values</li>
                  <li><strong>boolean</strong> - True/false values</li>
                  <li><strong>date</strong> - Date and time</li>
                  <li><strong>array</strong> - Lists of items</li>
                  <li><strong>object</strong> - Nested structures</li>
                  <li><strong>markdown</strong> - Rich text content</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-3 text-gray-300">Validation Rules</h3>
                <p className="leading-relaxed">
                  Add validation rules to ensure data quality and prevent common errors.
                </p>
              </div>
            </div>
          </div>

          {/* API Reference Section */}
          <div id="api-reference" className="pt-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">
              API Reference
            </h2>
            <div className="space-y-6 text-white">
              <p className="leading-relaxed">
                Use the Frontmatter API to programmatically manage your content and integrate with your existing tools.
              </p>
              <p className="text-[#D4F582]">
                Full API documentation coming soon...
              </p>
            </div>
          </div>

          {/* Examples Section */}
          <div id="examples" className="pt-12 border-t border-border">
            <h2 className="text-2xl md:text-3xl font-bold font-heading text-white mb-6">
              Examples
            </h2>
            <div className="space-y-6 text-white">
              <p className="leading-relaxed">
                Browse starter templates and real-world examples to get inspired.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-card/50 border border-border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Blog Template</h3>
                  <p className="text-sm">Complete blog setup with posts, tags, and authors</p>
                </div>
                <div className="bg-card/50 border border-border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Documentation Site</h3>
                  <p className="text-sm">Technical documentation with versioning</p>
                </div>
                <div className="bg-card/50 border border-border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Product Catalog</h3>
                  <p className="text-sm">E-commerce product management</p>
                </div>
                <div className="bg-card/50 border border-border rounded-lg p-4">
                  <h3 className="font-bold mb-2">Portfolio Site</h3>
                  <p className="text-sm">Showcase your work with projects and case studies</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12 text-center">
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
  );
}