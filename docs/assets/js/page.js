cube.width = 500
cube.height = 500
const ctx = cube.getContext("2d")
const v = [
    { x: 0.25, y: 0.25, z: 0.25 },
    { x: -0.25, y: 0.25, z: 0.25 },
    { x: 0.25, y: -0.25, z: 0.25 },
    { x: -0.25, y: -0.25, z: 0.25 },
    { x: 0.25, y: 0.25, z: -0.25 },
    { x: -0.25, y: 0.25, z: -0.25 },
    { x: 0.25, y: -0.25, z: -0.25 },
    { x: -0.25, y: -0.25, z: -0.25 }
]
const f = [
    [0, 1, 3, 2],
    [4, 5, 7, 6],
    [0, 4],
    [1, 5],
    [3, 7],
    [2, 6]
]
function cls() {
    ctx.fillStyle = '#101010'
    ctx.fillRect(0, 0, cube.width, cube.height)
}
function screen(point) {
    return { x: (point.x + 1) / 2 * cube.width, y: (1 - (point.y + 1) / 2) * cube.width }
}
function toTwoDimension({ x, y, z }) {
    return { x: x / z, y: y / z }
}
function add_z({ x, y, z }, nu) {
    return { x: x, y: y, z: z + nu }
}

let dt = 0
let nowangle = 0
function frame() {
    dt += 1 / 60
    nowangle = Math.PI * dt
    cls()
    for (const nf of f) {
        for (let i = 0; i < nf.length; i++) {
            const firstpoint = v[nf[i]]
            const secondpoint = v[nf[(i + 1) % nf.length]]
            linedrow(screen(toTwoDimension(add_z(rotate_xz(rotate_xy(firstpoint, nowangle), nowangle), 1))), screen(toTwoDimension(add_z(rotate_xz(rotate_xy(secondpoint, nowangle), nowangle), 1))), '#FFFFFF')
        }
    }
    setTimeout(frame, 1000 / 60)
}
function rotate_xy({ x, y, z }, angle) {
    return { x: x * Math.cos(angle) - y * Math.sin(angle), y: x * Math.sin(angle) + y * Math.cos(angle), z }
}
function rotate_xz({ x, y, z }, angle) {
    return { x: x * Math.cos(angle) - z * Math.sin(angle), y, z: x * Math.sin(angle) + z * Math.cos(angle) }
}
function rotate_yz({ x, y, z }, angle) {
    return { x, y: z * Math.cos(angle) - y * Math.sin(angle), z: z * Math.sin(angle) + y * Math.cos(angle) }
}
function linedrow(start, end, color) {
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
}
setTimeout(frame, 1000 / 60)