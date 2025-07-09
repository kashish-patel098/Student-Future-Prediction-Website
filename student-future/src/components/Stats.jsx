import React from 'react';

const Stats = () => {
  const stats = [
    { label: 'Students Helped', value: '10,000+' },
    { label: 'Career Paths', value: '50+' },
    { label: 'Success Rate', value: '95%' },
    { label: 'Universities', value: '100+' },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center animate-slide-up">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Trusted by Students Worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Our AI-powered platform has helped thousands of students make informed decisions about their future.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="flex flex-col bg-gray-50 dark:bg-gray-800 p-8 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <dt className="text-sm leading-6 text-gray-600 dark:text-gray-400">{stat.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-indigo-600 dark:text-indigo-400">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Stats;