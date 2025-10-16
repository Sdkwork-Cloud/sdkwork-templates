import { useSdkClient } from "@/hooks/client/useSdkClient";

export class ManagerFactory {
  private static instanceCache = new Map<any, any>();

  static create<T>(ManagerClass: new (client: any) => T): T {
    // 检查缓存中是否已存在该服务实例
    if (!this.instanceCache.has(ManagerClass)) {
      const sdkClient = useSdkClient();
      // 创建新实例并存入缓存
      this.instanceCache.set(ManagerClass, new ManagerClass(sdkClient));
    }

    // 返回缓存的实例
    return this.instanceCache.get(ManagerClass) as T;
  }
}
