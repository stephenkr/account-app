import { JoinStringsPipe } from './join-strings.pipe';

describe('JoinStringsPipe', () => {
  it('create an instance', () => {
    const pipe = new JoinStringsPipe();
    expect(pipe).toBeTruthy();
  });

  it('correctly joins the string array', () => {
    const actual = new JoinStringsPipe().transform(['one', 'two', 'three'])

    expect(actual).toBe('one, two, three');
  });
});
