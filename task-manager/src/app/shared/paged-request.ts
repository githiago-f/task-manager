import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, Min } from "class-validator";
import { SelectQueryBuilder } from "typeorm";

enum Order {
    ASC = 'asc',
    DESC = 'desc'
}

export class PagedRequest<T> {
    @Min(0)
    @IsNumber()
    @IsOptional()
    @ApiProperty({ default: 0, minimum: 0, required: false })
    public readonly page?: number;

    @ApiProperty({ required: false, default: 10 })
    public readonly perPage?: number;
    
    @ApiProperty({ enum: Order, required: false })
    public readonly order?: Order = Order.ASC;
    
    @ApiProperty({required: false, type: 'string'})
    public readonly orderBy?: keyof T;

    get asObjectQuery() {
        return {
            take: Number(this._perPage),
            skip: Number(this._page * this._perPage),
            order: { [this._orderBy]: this._order.toUpperCase() }
        }
    }

    toQuery(qb: SelectQueryBuilder<T>) {
        return qb.take(Number(this._perPage))
            .skip(Number(this._page * this._perPage))
            .orderBy(
                this._orderBy as string, 
                this._order.toUpperCase() as 'ASC' | 'DESC'
            );
    }

    private get _perPage() {
        return this.perPage || 10;
    }

    private get _page() {
        return this.page || 0;
    }

    private get _order() {
        return this.order || Order.DESC;
    }

    private get _orderBy() {
        return this.orderBy || 'createdAt';
    }
}