package org.colorcoding.ibas.finance.repository;

import org.colorcoding.ibas.bobas.common.ICriteria;
import org.colorcoding.ibas.bobas.common.IOperationResult;
import org.colorcoding.ibas.bobas.repository.IBORepositoryApplication;
import org.colorcoding.ibas.finance.bo.dimension.IDimension;
import org.colorcoding.ibas.finance.bo.postingperiod.IPostingPeriod;
import org.colorcoding.ibas.finance.bo.project.IProject;

/**
 * Finance仓库应用
 */
public interface IBORepositoryFinanceApp extends IBORepositoryApplication {

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-过账期间
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IPostingPeriod> fetchPostingPeriod(ICriteria criteria);

	/**
	 * 保存-过账期间
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IPostingPeriod> savePostingPeriod(IPostingPeriod bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-项目
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IProject> fetchProject(ICriteria criteria);

	/**
	 * 保存-项目
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IProject> saveProject(IProject bo);

	// --------------------------------------------------------------------------------------------//
	/**
	 * 查询-维度
	 * 
	 * @param criteria 查询
	 * @return 操作结果
	 */
	IOperationResult<IDimension> fetchDimension(ICriteria criteria);

	/**
	 * 保存-维度
	 * 
	 * @param bo 对象实例
	 * @return 操作结果
	 */
	IOperationResult<IDimension> saveDimension(IDimension bo);
	// --------------------------------------------------------------------------------------------//

}
