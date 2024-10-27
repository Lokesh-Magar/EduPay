// global.d.ts
import mongoose from 'mongoose';

declare global {
  var mongoose: typeof mongoose | undefined;
}