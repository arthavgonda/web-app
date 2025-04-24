import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

const PricingPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 gradient-text">Transparent Pricing</h1>
        <p className="text-xl text-gray-400 mb-8">
          DecentraGPU offers simple and fair pricing for both GPU providers and clients.
        </p>
      </div>

      {/* Pricing Models */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute transform rotate-45 bg-primary text-center text-xs font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
              <span className="text-black">For Clients</span>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Pay-as-You-Go</CardTitle>
            <CardDescription>
              Only pay for the compute time you actually use
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <p className="text-3xl font-bold">
                Variable <span className="text-xl font-normal">/hour</span>
              </p>
              <p className="text-gray-400 mt-2">
                Based on provider pricing and GPU specifications
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>No subscription fees</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>No minimum usage requirements</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>5% platform fee (included in listed prices)</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Second-by-second billing precision</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Free marketplace browsing</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary text-black">
              <Link href="/marketplace">Browse GPUs</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="border border-gray-800 bg-card/50 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20">
            <div className="absolute transform rotate-45 bg-primary text-center text-xs font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
              <span className="text-black">For Providers</span>
            </div>
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Provider Earnings</CardTitle>
            <CardDescription>
              Monetize your idle GPU compute power
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-8">
              <p className="text-3xl font-bold">95% <span className="text-xl font-normal">of rental fees</span></p>
              <p className="text-gray-400 mt-2">
                You set your own hourly rates
              </p>
            </div>
            <ul className="space-y-3">
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Direct payment to your account</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Only 5% platform fee on earnings</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Weekly payment processing</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Free listing of all your GPUs</span>
              </li>
              <li className="flex">
                <Check className="mr-2 h-5 w-5 text-green-500" />
                <span>Provider dashboard analytics</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary text-black">
              <Link href="/register">Become a Provider</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Typical Pricing */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Typical GPU Pricing</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">GPU Model</th>
                <th className="px-6 py-4 text-left">VRAM</th>
                <th className="px-6 py-4 text-left">Tensor Score</th>
                <th className="px-6 py-4 text-left">Typical Price Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-900/30">
                <td className="px-6 py-4">NVIDIA RTX 4090</td>
                <td className="px-6 py-4">24 GB</td>
                <td className="px-6 py-4">55.7</td>
                <td className="px-6 py-4">$1.50 - $2.50 / hour</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="px-6 py-4">NVIDIA RTX 4080</td>
                <td className="px-6 py-4">16 GB</td>
                <td className="px-6 py-4">44.1</td>
                <td className="px-6 py-4">$1.00 - $1.80 / hour</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="px-6 py-4">NVIDIA RTX 3090</td>
                <td className="px-6 py-4">24 GB</td>
                <td className="px-6 py-4">35.6</td>
                <td className="px-6 py-4">$0.80 - $1.50 / hour</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="px-6 py-4">NVIDIA RTX 3080</td>
                <td className="px-6 py-4">10 GB</td>
                <td className="px-6 py-4">30.2</td>
                <td className="px-6 py-4">$0.60 - $1.20 / hour</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="px-6 py-4">AMD RX 7900 XTX</td>
                <td className="px-6 py-4">24 GB</td>
                <td className="px-6 py-4">28.5</td>
                <td className="px-6 py-4">$0.70 - $1.30 / hour</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-gray-400 mt-4 text-sm italic text-center">
          Note: Actual prices may vary based on provider settings, market demand, and hardware specifications.
        </p>
      </div>

      {/* Comparison */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">How We Compare</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-800/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 text-left">Feature</th>
                <th className="px-6 py-4 text-center">DecentraGPU</th>
                <th className="px-6 py-4 text-center">Cloud Providers</th>
                <th className="px-6 py-4 text-center">Other GPU Marketplaces</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="bg-gray-900/30">
                <td className="px-6 py-4">Pricing Model</td>
                <td className="px-6 py-4 text-center">Pay-as-you-go, hourly</td>
                <td className="px-6 py-4 text-center">Monthly commitments, hourly</td>
                <td className="px-6 py-4 text-center">Various models</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="px-6 py-4">Platform Fee</td>
                <td className="px-6 py-4 text-center text-green-500">Only 5%</td>
                <td className="px-6 py-4 text-center">N/A (higher base prices)</td>
                <td className="px-6 py-4 text-center">10-20%</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="px-6 py-4">Privacy Features</td>
                <td className="px-6 py-4 text-center text-green-500">Advanced encryption, zero-knowledge</td>
                <td className="px-6 py-4 text-center">Basic encryption</td>
                <td className="px-6 py-4 text-center">Varies</td>
              </tr>
              <tr className="bg-gray-800/30">
                <td className="px-6 py-4">GPU Selection</td>
                <td className="px-6 py-4 text-center text-green-500">Wide variety, latest models</td>
                <td className="px-6 py-4 text-center">Limited selection</td>
                <td className="px-6 py-4 text-center">Moderate selection</td>
              </tr>
              <tr className="bg-gray-900/30">
                <td className="px-6 py-4">Provider Earnings</td>
                <td className="px-6 py-4 text-center text-green-500">95% of rental price</td>
                <td className="px-6 py-4 text-center">N/A</td>
                <td className="px-6 py-4 text-center">80-90%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Pricing FAQs</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">How is compute time billed?</h3>
            <p className="text-gray-400">
              We bill for the exact time your job runs, down to the second. You only pay for what you use, with no minimum usage requirements.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">When do providers receive payments?</h3>
            <p className="text-gray-400">
              Providers receive weekly payments for all completed jobs. Earnings are automatically transferred to your account every Friday.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Are there any hidden fees?</h3>
            <p className="text-gray-400">
              No. The only fee is our 5% platform fee, which is already included in the prices you see in the marketplace. There are no subscription fees or minimum usage requirements.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">How do I set pricing as a provider?</h3>
            <p className="text-gray-400">
              As a provider, you have complete control over your GPU pricing. You can set your own hourly rates based on your hardware specifications and market demand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;