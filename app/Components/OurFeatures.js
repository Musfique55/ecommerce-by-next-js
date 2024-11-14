import { MessageCircle, MonitorPlay, Settings, Smartphone } from 'lucide-react';
import React from 'react';

const OurFeatures = () => {
    const services = [
        {
          icon: Smartphone,
          title: "Outfit Finder",
          description: "Find Outfit for Gadgets",
        },
        {
          icon: MonitorPlay,
          title: "Share Experience",
          description: "We Value your Feedback",
        },
        {
          icon: MessageCircle,
          title: "Online Support",
          description: "Get Support on WhatsApp",
        },
        {
          icon: Settings,
          title: "Brothers Care",
          description: "Repair Your Device",
        },
      ]
    return (
    <section className="py-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="rounded-full bg-[#1A1A7E] p-3 text-white">
              <service.icon className="h-6 w-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">{service.title}</h3>
              <p className="text-sm text-gray-500">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    );
};

export default OurFeatures;