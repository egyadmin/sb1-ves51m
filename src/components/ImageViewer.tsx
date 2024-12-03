import React from 'react';
import Viewer from 'react-viewer';

interface ImageViewerProps {
  visible: boolean;
  onClose: () => void;
  images: string[];
}

export default function ImageViewer({ visible, onClose, images }: ImageViewerProps) {
  return (
    <Viewer
      visible={visible}
      onClose={onClose}
      images={images.map(src => ({ src }))}
      zIndex={1000}
    />
  );
}