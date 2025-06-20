import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
} from 'typeorm';
import { Click } from './click.entity';

@Entity('short_links')
export class ShortLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'original_url',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  originalUrl: string;

  @Column({ name: 'created_at', type: 'integer', nullable: false })
  createdAt: number;

  @Column({
    name: 'expires_at',
    type: 'integer',
    nullable: true,
    default: null,
  })
  expiresAt?: number | null;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  alias: string;

  @OneToMany(() => Click, (click: Click) => click.shortLink)
  clicks: Click[];

  @BeforeInsert()
  shortenTimestamps() {
    this.createdAt = Math.floor(Date.now() / 1000);
    this.expiresAt = this.expiresAt ? Math.floor(this.expiresAt / 1000) : null;
  }

  toJSON() {
    const shortLinkData = {
      ...this,
      expiresAt: this.expiresAt ? this.expiresAt * 1000 : null,
      createdAt: this.createdAt * 1000,
    };
    return shortLinkData;
  }
  // Store timestamps in seconds to save space; convert back to ms in toJSON
}
