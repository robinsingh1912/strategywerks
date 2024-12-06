import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Modal } from './Modal'; // Ensure the import path is correct

describe('Modal Component', () => {
  const onCloseMock = jest.fn();

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  const renderModal = (isOpen: boolean) => {
    render(
      <Modal isOpen={isOpen} onClose={onCloseMock}>
        <div>Modal Content</div>
      </Modal>
    );
  };

  test('renders correctly when open', () => {
    renderModal(true);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    renderModal(false);
    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  test('calls onClose when clicking outside the modal', () => {
    renderModal(true);
    fireEvent.mouseDown(document.body);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking the close button', () => {
    renderModal(true);
    fireEvent.click(screen.getByRole('button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
