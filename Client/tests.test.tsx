import React from 'react';
import { render } from '@testing-library/react';

// Sample component for testing
const SampleComponent: React.FC = () => {
  return <div>Hello, Test!</div>;
};

describe('Sample Tests', () => {
  
  it('renders without crashing', () => {
    const { getByText } = render(<SampleComponent />);
    expect(getByText('Hello, Test!')).toBeInTheDocument();
  });

  it('always passes', () => {
    expect(true).toBe(true);
  });

});

