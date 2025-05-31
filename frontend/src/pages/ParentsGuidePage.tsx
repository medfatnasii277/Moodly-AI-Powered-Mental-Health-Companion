import React from 'react';
import Navigation from '@/components/Navigation';
import ParentsGuide from '@/components/ParentsGuide';
import { Button } from '@/components/ui/button';


const ParentsGuidePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <ParentsGuide />
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-calm-blue/10 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-3">Find Professional Help</h3>
                <p className="text-muted-foreground mb-4">
                  Connect with mental health professionals who specialize in child and adolescent therapy.
                </p>
                <Button className="w-full rounded-xl">Find Therapists</Button>
              </div>
              
              <div className="bg-calm-blue/10 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-3">Parent Support Groups</h3>
                <p className="text-muted-foreground mb-4">
                  Join communities of parents sharing experiences and supporting each other.
                </p>
                <Button className="w-full rounded-xl">Find Support</Button>
              </div>
              
              <div className="bg-calm-blue/10 p-6 rounded-2xl">
                <h3 className="text-xl font-semibold mb-3">Educational Resources</h3>
                <p className="text-muted-foreground mb-4">
                  Access books, articles, and courses on child development and parenting.
                </p>
                <Button className="w-full rounded-xl">Browse Resources</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-calm-gray py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground">© {new Date().getFullYear()} MindfulSpace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ParentsGuidePage;