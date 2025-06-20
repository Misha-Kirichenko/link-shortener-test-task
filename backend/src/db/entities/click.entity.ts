import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ShortLink } from './short-link.entity';

@Entity('clicks')
export class Click {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  ip!: string;

  @Column({ name: 'created_at', type: 'integer', nullable: false })
  createdAt: number;

  @ManyToOne(() => ShortLink, (shortLink: ShortLink) => shortLink.clicks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'short_link_id' })
  shortLink: ShortLink;

  toJSON() {
    return {
      ...this,
      createdAt: this.createdAt * 1000,
    };
  }
}
