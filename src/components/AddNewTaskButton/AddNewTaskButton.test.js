import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddNewTaskButton from './AddNewTaskButton';

test('renders Add New Task Button', () => {
    render(<AddNewTaskButton />);
    const buttonElement = screen.getByText(/Add New Task/i);
    expect(buttonElement).toBeInTheDocument();
});

test('calls the onClick function when clicked', () => {
    const handleClick = jest.fn();
    render(<AddNewTaskButton onClick={handleClick} />);
    const buttonElement = screen.getByText(/Add New Task/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
});