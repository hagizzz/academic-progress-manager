export const getKeys = <T>(obj: T) => Object.keys(obj) as Array<keyof T>

export function randRange(min: number, max: number) {
    const r = Math.random() * (max - min) + min
    return Math.round(r * 100) / 100
}

export function randInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function choose(arr: Array<any>) {
    return arr[Math.floor(Math.random() * arr.length)]
}

export function randomNormal() {
    let u1 = 0,
        u2 = 0
    //Convert [0,1) to (0,1)
    while (u1 === 0) u1 = Math.random()
    while (u2 === 0) u2 = Math.random()
    const R = Math.sqrt(-2.0 * Math.log(u1))
    const phi = 2.0 * Math.PI * u2
    return [R * Math.cos(phi), R * Math.sin(phi)]
}

export function randomSkewNormal(mu: number, sigma: number, alpha = 0) {
    const [u0, v] = randomNormal()
    if (alpha === 0) {
        return mu + sigma * u0
    }
    const delta = alpha / Math.sqrt(1 + alpha * alpha)
    const u1 = delta * u0 + Math.sqrt(1 - delta * delta) * v
    const z = u0 >= 0 ? u1 : -u1
    return mu + sigma * z
}

export function constraint(value: number, min: number, max: number) {
    if (value >= max) return max
    if (value <= min) return min
    return value
}
