import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { z } from 'zod';
import { initEdgeStore } from '@edgestore/server';

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
  imagesForProducts: es.imageBucket({
    accept: ['image/jpeg', 'image/png', 'image/*'],
    maxSize: 1024 * 1024 * 4, // 4MB
  }),
});

export type EdgeStoreRouter = typeof edgeStoreRouter;

export const edgeStoreHandler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
});