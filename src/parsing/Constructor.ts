/*******************************************************************************
 * Constructor.ts
 *
 * @license GPL-3.0
 * @link https://github.com/verteramo/mooget
 ******************************************************************************/

/**
 * Gets constructur signature
 *
 * @example Constructor<typeof SomeClass>
 */
export type Constructor<T extends abstract new (...args: any) => any> =
  new (...args: ConstructorParameters<T>) => InstanceType<T>
