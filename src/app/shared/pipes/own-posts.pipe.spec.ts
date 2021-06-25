import { OwnPostsPipe } from './own-posts.pipe';

describe('OwnPostsPipe', () => {
  it('create an instance', () => {
    const pipe = new OwnPostsPipe();
    expect(pipe).toBeTruthy();
  });
});
