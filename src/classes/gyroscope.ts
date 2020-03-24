import Compass, {Rose} from './compass'

// a `Slicer` callback finds an nth-dimensional coordinate.
// it returns a cell, a row of cells, or a plane of cells.
export type Slicer = (
	dimensions:Array<number>,
	positions:Array<number|undefined>,
) => Array<number>

// a `Locator` callback finds neighboring addresses.
// such an address takes on the form of an index.
// one can use such an index to find a cell in `Map`.
export type Locator = (
	dimensions:Array<number>,
	index:number,
) => number

export default class Gyroscope extends Compass {
	private readonly dimensions:Array<number>
	private readonly slicer:Slicer
	private readonly locator:Locator
	constructor (
		rose:Rose,
		dimensions:Array<number>,
		slicer:Slicer,
		locator:Locator,
	) {
		super(rose)
		this.dimensions = dimensions
		this.slicer = slicer
		this.locator = locator
	}

	public neighborOf (
		index:number,
		direction:string,
	):number {
		const axis:number = this.axisOf(direction)
		const sign:number = this.signOf(direction)
		const delta:number = this.locator(this.dimensions, axis)
		return index + (sign * delta)
	}

	public sliceAt (
		coordinates:Array<number|undefined>
	):Array<number> {
		return this.slicer(this.dimensions, coordinates)
	}
}