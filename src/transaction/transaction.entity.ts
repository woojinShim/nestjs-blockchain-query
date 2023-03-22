import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    blockNumber: number;

    @Column()
    txHash: string;

    @Column()
    from: string;

    @Column()
    to: string;

    @Column({ type: "nvarchar", length: "5000" })
    content: string;

    @Column({ type: "nvarchar", length: "5000" })
    logs: string;

    @Column()
    logLength: number;
}