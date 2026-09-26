const pending = new Map<number, Set<number>>()

export const add = (uid: number, childUid: number): void => {
  let children = pending.get(uid)
  if (!children) {
    children = new Set()
    pending.set(uid, children)
  }
  children.add(childUid)
}

export const take = (uid: number): readonly number[] => {
  const children = pending.get(uid)
  pending.delete(uid)
  return children ? [...children] : []
}
