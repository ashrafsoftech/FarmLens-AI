/**
 * FarmLens AI - History Store Service
 * In-memory & persistent history store for saved livestock scan reports.
 */

import { ScanReport } from '../../src/types';
import { SAMPLE_SCANS } from '../../src/data/mockData';

export class HistoryStore {
  private scans: Map<string, ScanReport> = new Map();

  constructor() {
    this.seedInitialData();
  }

  /**
   * Seeds initial sample scans into memory
   */
  private seedInitialData() {
    SAMPLE_SCANS.forEach((scan) => {
      this.scans.set(scan.id, scan);
    });
  }

  /**
   * Retrieves all scan reports in reverse chronological order
   */
  public getAllScans(filter?: { species?: string; riskLevel?: string; searchQuery?: string }): ScanReport[] {
    let list = Array.from(this.scans.values());

    if (filter) {
      if (filter.species && filter.species !== 'all') {
        list = list.filter((s) => s.animalType.toLowerCase() === filter.species!.toLowerCase());
      }
      if (filter.riskLevel && filter.riskLevel !== 'all') {
        list = list.filter((s) => s.riskLevel.toLowerCase() === filter.riskLevel!.toLowerCase());
      }
      if (filter.searchQuery && filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase().trim();
        list = list.filter(
          (s) =>
            s.animalName?.toLowerCase().includes(q) ||
            s.breed.toLowerCase().includes(q) ||
            s.animalType.toLowerCase().includes(q) ||
            s.symptoms.some((sym) => sym.toLowerCase().includes(q))
        );
      }
    }

    // Sort newest first
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  /**
   * Retrieves a single scan report by ID
   */
  public getScanById(id: string): ScanReport | undefined {
    return this.scans.get(id);
  }

  /**
   * Saves or updates a scan report
   */
  public saveScan(scan: ScanReport): ScanReport {
    if (!scan.id) {
      scan.id = `scan-${Date.now().toString().slice(-6)}`;
    }
    if (!scan.createdAt) {
      scan.createdAt = new Date().toISOString();
    }
    this.scans.set(scan.id, scan);
    return scan;
  }

  /**
   * Deletes a scan report by ID
   */
  public deleteScan(id: string): boolean {
    return this.scans.delete(id);
  }

  /**
   * Clears all scans from history
   */
  public clearAll(): void {
    this.scans.clear();
  }
}

export const historyStore = new HistoryStore();
